# npm install jquery --save
# npm install datatables.net --save
# npm install datatables.net-dt --save
# npm install angular-datatables --save
# npm install @types/jquery --save-dev
# npm install @types/datatables.net --save-dev
# npm install ngx-bootstrap bootstrap --save
# npm install datatables.net-buttons --save
# npm install datatables.net-buttons-dt --save
# npm install @types/datatables.net-buttons --save-dev
# npm install jszip --save

npm install --save @ng-select/ng-select

npm cache clear
npm install



firebase deploy start

firebase deploy -

ref video - https://www.youtube.com/watch?v=T0ATpAC5f20

ng build --prod

if  --- WARNING in budgets, maximum exceeded for initial. Budget 2 MB was exceeded by 1.77 MB

change in angular.json -
"budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "10mb",
                  "maximumError": "10mb"
                },

increase maximumerror size	and maximum warning error.

then give same cmd - ng build --prod

files generated - dist folder created


firebase - login
https://firebase.google.com/

go to console menu -
https://console.firebase.google.com/u/0/

create new project

give project name - accept and continue

then continue

change analytics location - check accept

give create project

after proj created - continue

click build (menu)  - click hosting (sub menu)

click get started -

to install firebase cli
copy the npm install -g firebase-tools -> run in ur angular project

click next

initialize project

signin to google - copy this cmd run in terminal -  firebase login

click allow

run cmd -  firebase init

 Are you ready to proceed? Yes

 Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices.
 click down arrow -
 select this using space key click enter(Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys)


 What do you want to use as your public directory? (public)  dist/folder (ng build --prod - cmd generated files)

 Configure as a single-page app (rewrite all urls to /index.html)? N

 Set up automatic builds and deploys with GitHub? (y/N)?  N

 File dist/angular6-sidenav-example/index.html already exists. Overwrite? N

 Firebase initialization complete!

give  - firebase deploy

 Deploy complete!

Hosting URL: https://carwash-2f3ee.web.app

firebase deploy end



# git deploy

ref link - https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4#:~:text=1%20The%20first%20thing%20to%20do%20if%20you,means%20it%20has%20successfully%20been%20published%20on%20gh-pages
How to deploy Angular Apps to GitHub Pages

Create your Github Repository:
push your changes

Install Angular CLI gh-pages:
npm i angular-cli-ghpages --save-dev

Run Build :
ng build --prod --base-href "https://GithubUserName.github.io/GithubRepoName/" (change username, reponame)

Deploy to gh-pages:
npx angular-cli-ghpages --dir=dist/Project-name

Visit the App Page:
 https://GithubUserName.github.io/GithubRepoName/



npm install --save ng2-charts

npm install --save chart.js