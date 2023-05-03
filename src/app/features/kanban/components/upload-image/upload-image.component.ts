import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supabase } from 'src/env/supabase';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  @Input()
  public boardId: number | undefined;

  constructor (private snackBar: MatSnackBar) {};
  
  imageSrc?: string;
  noImage = false;
  isUploading = false;
  isOwner = false;
  public errorMsg = '';
  public operationFailed = false;
  public imageData?: string;

  ngOnInit() {
    this.getCurrentImage();
  }

  ngAfterViewInit() {
    this.fetchIsOwnerState();
  }

  /**
   * Check if user is owner of the board
   */
  async fetchIsOwnerState() {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if(!userId)
      throw new Error("cannot get user id");


    //Get users RoleID for the active board
    const userBoardResult = await supabase.from("user_board_role").select("role_id").eq("user_id", userId).eq("board_id", this.boardId);
    const roleId = userBoardResult.data?.[0]?.role_id;

    //Get name of the role by RoleID
    const roleResult = await supabase.from("role").select("name").eq("id", roleId);
    const role = roleResult.data?.[0]?.name;

    //Ser isOwner true if user role = owner
    this.isOwner = role === "Owner";
  }

  /**
   * get the current image stored in the database
   */
  async getCurrentImage() {
    let entries = await supabase.from('board_image').select('*').eq('board_id', this.boardId);

    if (entries == null || entries.data == null)
        return;
    
      if (entries.data.length > 0) {
        let entry = entries.data[0];
        this.imageSrc = entry["img_storage"];
        return;
      }
      else {
        this.noImage = true;
      }
  }

  /**
   * Triggert when file selected.
   */
  onFileSelected(event: Event) {
    //File size limit: 2mb
    const maxFileSize = 2 * 1024 * 1024;
    //Only allow type .png
    const allowedFileTypes = ['image/png'];
    const eventTarget = event.target as HTMLInputElement;
      
    if (eventTarget == null || eventTarget.files == null || eventTarget.files.length != 1)
      return;

    const file = eventTarget.files[0];

    //Check file size
    if (file.size > maxFileSize) {
      this.operationFailed = true;
      this.errorMsg = 'File size exceeds maximum allowed size';
      eventTarget.value = "";
      return;
    }
    
    //Check file type
    if (!allowedFileTypes.includes(file.type)) {
      this.operationFailed = true;
      this.errorMsg = 'File type not allowed';
      eventTarget.value = "";
      return;
    }

    //Read file as URL
    if (file) {
      const reader = new FileReader();

      let self = this;
      reader.onloadend = function(x) {
        self.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  /**
   * Triggert by upload button
   */
  async onSubmit() {
    //Check for data
    if (this.imageData == undefined || this.imageData == null) {
      this.snackBar.open("No file selected!", "", {duration: 3000})
      return;
    }

    this.uploadImage(this.imageData);
  }

  /**
   * Upload of image to the database
   */
  async uploadImage(imageData: string) {
    this.imageSrc = undefined;
    this.isUploading = true;
    //Get already existing entries
    let entries = await supabase.from('board_image').select('*').eq('board_id', this.boardId);

      if (entries == null || entries.data == null)
        return;
    
      //If entry exists update existing data
      if (entries.data.length > 0) {
        let entry = entries.data[0];

        const { data, error } = await supabase
          .from('board_image')
          .update({img_storage: imageData})
          .eq('id', entry["id"]);
        this.isUploading = false;

        this.imageSrc = imageData;

        this.snackBar.open("Image successfully uploaded!", "", {duration: 3000});
        return;
      }

      //If no entry exists insert new data
      this.imageSrc = undefined;
      this.isUploading = false;
      const {data, error} = await supabase
        .from('board_image')
        .insert([
          { 
            board_id: this.boardId,
            img_storage: imageData,
          },
        ]);
      this.isUploading = false;

        if (data != null)
          this.imageSrc = data[0]["img_storage"];

      
      //Error handling and user feedback
      if (error != null) {
        this.snackBar.open(error.message, "", {duration: 3000});
        return;
      }

      this.snackBar.open("Image successfully uploaded!", "", {duration: 3000});
  }
}
