Title: Generate Static Blog with Pelican
Date: 2024-04-24
Category: web
Tags: pelican
Summary: 

# Generate Static Blog with Pelican

## 1.Install pelican and create blog project:

[Pelican](https://github.com/getpelican/pelican) is a static site generator that allows you create web sites by composing text files in formats such as markdown

```shell
python3 -m pip install "pelican[markdown]"
```
then create your own blog folder just like:
```shell
mkdir MyStaticBlog
cd MyStaticBlog
mkdir ganchuanman.github.io
cd ganchuanman.github.io
```
use pelican-quickstart command to gerate the blog project
```shell
pelican-quickstart
```
the pelican will ask you some questions about your project config:

```shell
pelican-quickstart
Welcome to pelican-quickstart v4.9.1.

This script will help you create a new Pelican-based website.

Please answer the following questions so this script can generate the files
needed by Pelican.


> Where do you want to create your new web site? [.] ganchuanman.github.io
> What will be the title of this web site? Opps
> Who will be the author of this web site? ganchuanman
> What will be the default language of this web site? [en] en
> Do you want to specify a URL prefix? e.g., https://example.com   (Y/n) n
> Do you want to enable article pagination? (Y/n) Y
> How many articles per page do you want? [10] 20
> What is your time zone? [Europe/Rome] China
Please enter a valid time zone:
 (check [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones])
> What is your time zone? [Europe/Rome] Asia/Shanghai
> Do you want to generate a tasks.py/Makefile to automate generation and publishing? (Y/n) Y
> Do you want to upload your website using FTP? (y/N) N
> Do you want to upload your website using SSH? (y/N) N
> Do you want to upload your website using Dropbox? (y/N) N
> Do you want to upload your website using S3? (y/N) N
> Do you want to upload your website using Rackspace Cloud Files? (y/N) N
> Do you want to upload your website using GitHub Pages? (y/N) Y
> Is this your personal page (username.github.io)? (y/N) y
Done. Your new project is available at /Users/bytedance/workspace/com/MyStaticBlog/ganchuanman.github.io
```

## 2.Config theme:
let's goto MyStaticBlog dir to clone the theme project:
```shell
git clone https://github.com/getpelican/pelican-themes.git
```
then you can choose a theme you like on this website: [Pelican Themes](https://pelicanthemes.com/)

I like minimalism style, so i choose this [martin-pelican](https://pelicanthemes.com/martin-pelican/) theme.

<img src="{attach}/assets/imgs/iShot_2024-03-01_09.56.12.png" alt="maritin-pelican" style="width:500px;"/>

```shell
cd pelican-themes/
pelican-themes -i martin-pelican
pelican-themes -U martin-pelican // use this command to make the new theme take effective
```
after install the theme, we need enter our blog project
```shell
cd ganchuanman.github.io/
```
you can see pelicanconf.py file in your project root path, add a new line in the file:
```python
THEME = "martin-pelican"
```
then re-generate the website with your new theme:
```shell
pelican content
```
use this command to preview your blog content on http://127.0.0.1:8000
```shell
pelican --listen
```

## 3.Write your first blog:
our blog content was written with markdown in content folder:
```shell
cd ganchuanman.github.io/content
touch first_blog.md
```

## 4.Publish blog to github page:
Pelican is pure static website generator, the repo/output folder is the root document path of blog website. If we choose Github Pages as blog site hosting server, there is a problem need to be solved: it requires a gh-pages branch that is the site's document root. This means that keeping documentation sources in the branch with code is a bit difficult.

but there is a util makes it easy: [ghp-import](https://github.com/c-w/ghp-import)

```shell
pip3 install ghp-import
```
after install ghp-import,  we can publish our output content to another branch named gh-pages.
```shell
ghp-import output
git push origin gh-pages
```
 then config the github repo settings of ganchuanman.github.io:

<img src="{attach}/assets/imgs/iShot_2024-03-01_11.56.40.png" alt="github-pages-setting" style="width:500px;"/>