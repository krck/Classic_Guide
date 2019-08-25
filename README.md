WoW Classic Alliance Level Guide
================================

About the Level Guide
---------------------

Level Data: This Guide is based on the Alliance speed-level route created by<br>
Joana. You can find this route (and the famouse Horde one) on his [homepage](https://www.joanasworld.com/). <br>

Quest Data: All the NPC, Mob, Item and general Quest-Data was taken from the great Questie <br>
WoW Addon. The original Data is in the .lua format and available on the Addons [git repo](https://github.com/AeroScripts/QuestieDev). <br>

The rest is written by me and probably not the greatest code, because i took this as a opportunity <br>
to acquire basic TypeScript and NoSQL skills and learn about Docker as well, while im at it ... <br>

Project structure
---------------------

- Database: MongoDB (seeded with .json files)
- Backend: TypeScript API running on a Express-Server 
- Frontend: Bootstrap + jQuery running on nginx

ToDo
----
- [ ] Backend: Use .env variables 
- [ ] Backend: Update Exception-Handling
- [ ] Backend: async-await Controllers (mongoose calls)
- [ ] Frontend: Use Vue.js instead of just Bootstrap/jQuery
- [ ] Frontend: Use sass instead of plain css
- [ ] ...

Setup
-----

Some basic instructions to run this locally, because its not hosted anymore (thanks AWS!) <br>
Only [Docker](https://www.docker.com/products/docker-desktop) is required (But hardware virtualization has to be turned on in the BIOS). <br>

Easy Setup (Pre-Build)
- 

<b>Setup (Local-Build)</b>:
- Download this repo and open up a shell
- Make sure Docker(Desktop) is running
- $ cd "path-to-repo"
- $ docker-compose build
- $ docker-compose up
Thats it. The Guide will be available on "localhost/"

<b>For later checks and local cleanup use</b>
- $ docker container ls -a
- $ docker image ls -a
- $ docker container prune -f
- $ docker image prune -f -a
