# Easy Board
An easy to use open source Kanban web application. Start planning your projects today!

Easy Board ships as Docker containers. This allows for easy and fast deployment which allows you to host it on premise or with the help of a cloud provider! 

## Getting started
1. If not already done, install the latest version of Docker and pgAdmin
2. Clone this repository or download and extract the .zip file
3. Navigate to `easy_board_application/docker`
4. Copy `.env.example` to `.env` 
5. Run `docker compose up` and wait until all containers are up and running
6. Go to pgAdmin and register your server. Set your connection values as declared in your .env:
    - Port: `POSTGRES_PORT` 
    - Username: `POSTGRES_DB`
    - Password: `POSTGRES_PASSWORD`
7. After successful registration open YourServerName > Databases > postgres
8. Right click postgres and choose `Restore...`
9. Select the file `nodata.backup`
10. Under Data/Objects select Type of objects > `Only schema`
11. Click `Restore` - IMPORTANT: This job will fail due to the preconfigured database. This is correct and the error can be ignored.
12. Now open YourServerName > Schemas > public > Tables
13. Right click `role` and choose `Restore...`
14. Select the file `roledata.backup`
15. Under Data/Objects select Type of objects > `Only data`
16. Click `Restore`
17. Well done! You successfully configured your Easy Board application!

## Further help
To get more help on EasyBoard visit our [helpdesk](https://kanbanappdhbw.atlassian.net/wiki/spaces/EBH/overview)!.
