# Memory Game

Ett interaktivt memory-spel utvecklat som en individuell webbapplikation med fokus på End-to-End-testning med Cypress.

## Om Projektet

Detta projekt är ett klassiskt memory-spel med 16 kort (8 par) som testas grundligt med Cypress. Målet har varit att skapa en fullt fungerande applikation vars samtliga funktioner, från spelmekanik till användargränssnitt, är täckta av automatiserade tester. Applikationen hanterar både "happy path"-scenarier och "unhappy path"-scenarier för att säkerställa robusthet.

## Installation och Bygge

Följ dessa steg för att komma igång med projektet lokalt:

1.  Klona repositoryt:

    ```bash
    git clone git@github.com:Peter-WebDev/cypress-intro.git
    ```

2.  Navigera till projektkatalogen och installera beroenden:

    ```bash
    cd cypress-intro
    npm install
    ```

3.  **Databasinställningar:**

    - **Miljövariabler:** Skapa en `.env`-fil i rotkatalogen med följande anslutningssträng:
      ```
      DATABASE_URL="mongodb://localhost:27017/cypress-dev?replicaSet=rs0"
      ```
    - **Databasinstallation:** Applikationen använder **Prisma** och en lokal **MongoDB-databas** som måste köras i ett **replicaset** med namnet `rs0`. Se till att din lokala MongoDB-instans är konfigurerad på detta sätt.

4.  **Sätt upp databasen:**
    Kör följande kommandon i ordning för att skapa databasschemat och fylla databasen med initial testdata:

    ```bash
    npm run genereate
    npm run push
    npm run seed
    ```

5.  Starta utvecklingsservern:

    ```bash
    npm run dev
    ```

    Applikationen kommer nu att vara tillgänglig på `http://localhost:3000`.

## Tester

Projektets funktionalitet är säkerställd med E2E-testsviter byggd med Cypress. Testerna verifierar allt från att korten blandas förutsägbart till att användarens resultat sparas på en leaderboard.

### Köra Testerna

Du kan köra testerna i antingen interaktivt läge eller i headless-läge.

#### Interaktivt läge

Kör följande kommando för att starta Cypress Test Runner i Chrome:

```bash
npm run test
```

Detta öppnar ett grafiskt gränssnitt där du kan se testerna köras i realtid.

#### Headless-läge

För att köra testerna direkt i terminalen utan ett grafiskt gränssnitt, använd detta kommando:

```bash
npm run test:run
```
