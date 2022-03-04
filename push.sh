#强制推送
#!/usr/bin/env bash
set -e
git init
git add -A
git commit -m 'zhangxiaoming dev'
git push -f "https://github.com/BIgerMe/beautiful_frontend.git" master
exec /bin/bash




