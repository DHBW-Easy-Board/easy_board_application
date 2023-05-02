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

  
  imageSrc: string | undefined;
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

  async fetchIsOwnerState() {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if(!userId)
      throw new Error("cannot get user id");

    const userBoardResult = await supabase.from("user_board_role").select("role_id").eq("user_id", userId).eq("board_id", this.boardId);
    const roleId = userBoardResult.data?.[0]?.role_id;

    const roleResult = await supabase.from("role").select("name").eq("id", roleId);
    const role = roleResult.data?.[0]?.name;
    this.isOwner = role === "Owner";
  }

  async getCurrentImage() {
    let entries = await supabase.from('board_image').select('*').eq('board_id', this.boardId);

    if (entries == null || entries.data == null)
        return;
    
      if (entries.data.length > 0) {
        let entry = entries.data[0];
        this.imageSrc = entry["img_storage"];
        return;
      }
  }

  onFileSelected(event: Event) {
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const allowedFileTypes = ['image/png'];
    const eventTarget = event.target as HTMLInputElement;
      
    if (eventTarget == null || eventTarget.files == null || eventTarget.files.length != 1)
      return;

    const file = eventTarget.files[0];

    if (file.size > maxFileSize) {
      this.operationFailed = true;
      this.errorMsg = 'File size exceeds maximum allowed size';
      eventTarget.value = "";
      return;
    }
    
    if (!allowedFileTypes.includes(file.type)) {
      this.operationFailed = true;
      this.errorMsg = 'File type not allowed';
      eventTarget.value = "";
      return;
    }

    if (file) {
      const reader = new FileReader();

      let self = this;
      reader.onloadend = function(x) {
        self.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.imageData == undefined || this.imageData == null) {
      this.snackBar.open("No file selected!", "", {duration: 3000})
      return;
    }

    this.uploadImage(this.imageData);
  }

  async uploadImage(imageData: string) {
    this.imageSrc = undefined;
    this.isUploading = true;
    let entries = await supabase.from('board_image').select('*').eq('board_id', this.boardId);

      if (entries == null || entries.data == null)
        return;
    
      if (entries.data.length > 0) {
        let entry = entries.data[0];

        const { data, error } = await supabase
          .from('board_image')
          .update({img_storage: imageData})
          .eq('id', entry["id"]);
        this.isUploading = false;

        this.imageSrc = imageData;

        return;
      }

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

      if (error != null) {
        this.snackBar.open(error.message, "", {duration: 3000});
        return;
      }

      this.snackBar.open("Image successfully uploaded!", "", {duration: 3000});
  }
}
