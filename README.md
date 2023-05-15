# Easy Board
An easy to use open source Kanban web application. Start planning your projects today!

Easy Board ships as Docker containers. This allows for easy and fast deployment which allows you to host it on premise or with the help of a cloud provider! 

## Getting started
1. If not already done, install the latest version of Docker and pgAdmin
2. Clone this repository or download and extract the .zip file
3. Navigate to `easy_board_application/docker`
4. Copy `.env.example` to `.env` 
5. Change POSTGRES_PASSWORD password if necessary
6. If necessary change supabase secrets. Follow the instructions on https://supabase.com/docs/guides/self-hosting/docker#securing-your-setup (for testing purposes don't change anything in this section)
7. Run `docker compose up` and wait until all containers are up and running
8. Go to pgAdmin and register your server. Set your connection values as declared in your .env:
    - Port: `POSTGRES_PORT` 
    - Username: `POSTGRES_DB`
    - Password: `POSTGRES_PASSWORD`
9. After successful registration open YourServerName > Databases > postgres
10. Right click postgres and choose `Restore...`
11. Select the file `nodata.backup`
12. Under Data/Objects select Type of objects > `Only schema`
13. Click `Restore` - IMPORTANT: This job will fail due to the preconfigured database. This is correct and the error can be ignored.
14. Now open YourServerName > Schemas > public > Tables
15. Right click `role` and choose `Restore...`
16. Select the file `roledata.backup`
17. Under Data/Objects select Type of objects > `Only data`
18. Click `Restore`
19. Well done! You successfully configured your Easy Board application!

## Further help
To get more help on EasyBoard visit our [helpdesk](https://kanbanappdhbw.atlassian.net/wiki/spaces/EBH/overview)!.
