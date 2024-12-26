### Hello, I'm Nishan, The developer of this app.

## Purpose of this app

This app is built to generate ID cards of students or employees through data uploaded via an excelsheet.

## How to use this app?

- First clone the repo and hit

  ```
  npm i
  ```

- setup Env :

  ```
  GOOGLE_CLIENT_ID="enter your own data"
  GOOGLE_CLIENT_SECRET="enter your secret"
  DB_URI="enter your mongodb uri"
  NEXTAUTH_SECRET="secret must be secret"
  NEXTAUTH_URL="http://localhost:3000"
  ```

- kickstart the app:
  ```
  npm run dev
  ```

# FOR DEVELOPERS

I am Writing this documentation as per the user flow on the app.
Do explore anything un included yourself

## 1. Authentication is Done Using NextAuth:
    I have used Google Provider adn the config file can be found on the directory '@/lib/authOptions'
    This is frequently used in server components and the api routes as well to get the user session on the server.
    
## 2. Once the user is logged in, the pages are located as follows:
    - schoolpage: "@/app/schools/page.tsx"
    - classpage: "@/app/schools/[name]/page.tsx"
        The [name] is used to pass the schoolname dynamically
    - Datapage: "@/app/schools/[name]/[clasName]/page.tsx
        The [name] is for schoolname and [className] is for passing classname dynamically.
    - Uploadpage: "@/app/uplaod/page.tsx"

## 3. Lets talk about the api routes
    - Authentication: "/api/auth/*"
    - Uploadpage:
        uploading of excel sheet:  "/api/uploadSheet/"
    - Schoolpage: 
        addnew: "/api/school/add"
        getAll: "/api/school/getAll"
    - Classpage: 
        getall: "/api/school/[schoolName]/"
        addnew: "/api/school/[schoolName]/add/"
    - Datapage: 
        getall: "/api/school/[schoolName]/[className]/"


This is all i guess.

### Additional Info

    - Some custom tailwind vars are made inside tailwind.config.ts
    - The 'Types' folder contains custom types
    - 'Providers' has session wrapper for nextAuth
    - 'models' has schemas
    - 'lib' has some config files for db