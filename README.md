### Pre req
node 6+

npm 3+

```

### Master Branch
## In one tab:
$ git clone https://github.com/joannawheeler/react-stockcharts-line
$ cd react-stockcharts-line
$ cd server
$ npm install
$ touch .env # create a file to store database connection credentials
# in the below command, replace /* insert appropriate credentials */ with the appropriate credentials
$ echo "
DB_HOST=/* insert appropriate credentials */
DB_USER=/* insert appropriate credentials */
DB_PASS=/* insert appropriate credentials */
DB_NAME=/* insert appropriate credentials */
" >> .env
$ PORT=3001 node bin/www # this should start a proxy server at localhost:3001/stocks

## In another tab:
$ cd react-stockcharts-line
$ cd linechart
$ npm install
$ npm start # this should launch a browser with http://localhost:3000


### To Checkout 'fetch_from_endpoint_and_display_tools_on_hover_on_entry_exit__points' Branch
$ git clone https://github.com/joannawheeler/react-stockcharts-line
$ cd react-stockcharts-line
$ git checkout fetch_from_endpoint_and_display_tools_on_hover_on_entry_exit__points
$ cd linechart
$ npm install
$ npm start

```