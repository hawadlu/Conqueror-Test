<h1>How to run</h1>
<h2>Database</h2>
I have used a local postgresql instance. All you need to do is set it up and point config.php to it.

You can use setup.sql to automatically populate the tables. 

Run using...

```
 php -S localhost:8000 -t public/
```

<h2>Front end</h2>
I have used vite as my built tool.

You can run the frontend by...

```
npm i
npm run dev
```

If you have cors issues you can use this to open a session with cors disabled (mac).

```
chrome-dev='open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security'
```

