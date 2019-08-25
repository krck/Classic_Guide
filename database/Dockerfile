FROM mongo:4.0

# Add the data files to the Container
COPY zones.json /zones.json
COPY quests.json /quests.json
COPY npcs.json /npcs.json
COPY objects.json /objects.json

# Create a MongoDB collection based on the json data
CMD mongoimport --host mongodb --db classicDB --collection zones --type json --file /zones.json --jsonArray && mongoimport --host mongodb --db classicDB --collection quests --type json --file /quests.json --jsonArray && mongoimport --host mongodb --db classicDB --collection npcs --type json --file /npcs.json --jsonArray && mongoimport --host mongodb --db classicDB --collection objects --type json --file /objects.json --jsonArray
