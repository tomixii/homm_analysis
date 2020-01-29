import json

with open("creaturedata.json", "r") as jsonFile:
    data = json.load(jsonFile)

grouped = {}
for creature in data:
    if creature["Town"] in grouped:
        grouped[creature["Town"]].append(creature)
    else:
        grouped[creature["Town"]] = [creature]


print(grouped)
with open("creaturedata_grouped.json", "w") as jsonFile:
    json.dump(grouped, jsonFile)
