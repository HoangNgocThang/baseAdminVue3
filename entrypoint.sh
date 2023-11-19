#!/bin/sh

echo "Replacing env constants in JS"
for file in /app/js/app.*.js* /app/index.html
do
  echo "Processing $file ...";

  sed -i 's|https://api-merchant-dev.postpay.vn|'${VITE_BASE_API_URL}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'
echo "Done!"
