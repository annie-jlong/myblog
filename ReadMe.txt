Development Tools:

React ASP.Net Core

Authentication: Microsoft Identity

Database: Sql server 2017 docker


1. download and run docker image for sql server as below:
 
sudo docker pull mcr.microsoft.com/mssql/server:2017-latest
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=abcd@123" -p 1433:1433 --name sql1 -h sql1 -d mcr.microsoft.com/mssql/server:2017-latest
sudo docker exec -it sql1 "bash"
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "abcd@123"

database script: Create database CardDB
 				  Use CardDB
 				  Create Table Card (Id int IDENTITY(1,1), Name VARCHAR(50), Email VARCHAR(50) Not NULL Primary Key, Status VARCHAR(50), Content NVARCHAR(1000), Category NVARCHAR(50))

2. open project from visual studio and run.

3. Register user by email.

4. click "create" in the home page or go to card menu to create new card.

5. card information will show in the home page.

6. card component can also for edit and delete card.
