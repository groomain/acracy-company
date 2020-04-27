rm -f .env*

if [ "$CONTEXT" = "production" ]
then
    echo "Production mode"
    varprefix="pjt_prd_"
else
    echo "Integration mode"
    varprefix="pjt_itg_"
fi

while read -r line; do
  name="${line%=*}"
  eval value="\"\$$name\""
  if [[ $name == $varprefix* ]]; then
    tmp="${name/$varprefix/}"
    for newname in $tmp; do
      eval export "$newname"="\"$value\""
      echo "$newname => $value"
    done
  fi
done <<EOF
$(env)
EOF

npm run build
echo "/*    /index.html   200" > build/_redirects