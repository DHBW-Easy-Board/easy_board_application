# EasyBoard
An easy to use Kanban Webapp. Start planning your projects today!

## Install with Docker (recommended)
### Requirements
- docker installed
- pgadmin installed
- git cli (heavily recommended)

### Installation

1. Go to your installation folder
2. run `git clone https://github.com/DHBW-Easy-Board/easy_board_application.git` or download and extract .zip file
3. `cd easy_board_application/docker`
4. cp .env.example .env 
5. change all enviroment variables nessesary for your installation (passwords)
6. `docker compose up` (add `-d` for detached mode)
7. Wait until all docker container are up and running

8. open pgadmin
9. register your server (default: on port 5432)
- `POSTGRES_DB`: as username
- `POSTGRES_PORT`: as port
- `POSTGRES_PASSWORD`: as password

10. after successfull registration unfold your server > Databases > postgres
11. right click on postgres and choose `restore`
12. select `nodata.backup` file
13. Go to `Data/Objects` and select `only schema` (under type of objects)
14. click restore (!!!NOTICE: this job will fail due to the preconfiged database, this is totally fine!!!)
15. when the job fails, unfold `Schemas/public/Tables`
16. right click on `role` and click `restore`
17. select `roledata.backup` file
18. under `Data/Objects` check if `Only Data` is selected
19. click `restore` (this job should not fail)
20. well done! You successfully configured your database. You can now use the app!

## Install locally

### Getting started
1. If not already done, install the latest version of node and npm
2. Run `npm install`

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Further help
To get more help on EasyBoard visit our [helpdesk](https://kanbanappdhbw.atlassian.net/wiki/spaces/EBH/overview)!.
