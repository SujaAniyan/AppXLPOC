set +v
echo Populating appXL-Test DB


echo
echo Creating User Collection
mongoimport --db appXL-Test --collection users --file jsonFiles/user.json --type json --jsonArray


echo
echo Creating User Collection
mongoimport --db appXL-Test --collection lovs --file jsonFiles/lov.json --type json --jsonArray


echo
echo Creating User Collection
mongoimport --db appXL-Test --collection groups --file jsonFiles/group.json --type json --jsonArray


echo
sleep