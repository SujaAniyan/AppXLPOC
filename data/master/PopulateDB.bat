ECHO OFF
ECHO Initializing ifb-Test DB with master data...

ECHO:
ECHO "Importing master user..."
mongoimport --db ifb-Test --collection users --file jsonFiles\user.json --type json --jsonArray

ECHO:
ECHO "Importing master group structure..."
mongoimport --db ifb-Test --collection groups --file jsonFiles\group.json --type json --jsonArray

ECHO:
ECHO "Creating Candidates Collection..."
mongoimport --db ifb-Test --collection candidates --file jsonFiles\candidates.json --type json --jsonArray

ECHO:
ECHO "Creating Feedback Collection..."
mongoimport --db ifb-Test --collection feedbackdefs --file jsonFiles\feedbackDef.json --type json --jsonArray

ECHO:
ECHO "Creating Positions Collection..."
mongoimport --db ifb-Test --collection positions --file jsonFiles\positions.json --type json --jsonArray



ECHO:
PAUSE