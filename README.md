# collage_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Its a project where you can upload your tokens (images) to a website and sign in to a exact serie of your choice. You input all data via backend server (Django admin) - title, number if token, number of author, serie title.

The concept of page is selling tokens. If the whole serie is still active (in stock/sale) you can see only the cover of the serie (welcome page). If the serie is already minted (sold) you can see all the images which were available in that serie by clicking 'View gallery' button on main page.

Each serie has its own view based on dynamic url. When you hover on an image you can see the title above and serie number, image number and author number below.

Active mark shows all the sold tokens from all the series in a random way each time you refresh the page.

When changing the component you can see a loader based on logo of dialog-box

https://user-images.githubusercontent.com/76727970/135420822-e2226cc6-5c3c-4a97-9594-7722f4505736.mp4


