# Cookaine

Marmiton mais pour les desserts

# Lancer le projet

```bash
git clone "https://github.com/MatthiasChometon/Cookaine.git"
```

## Lancer le back

ouvrir un bash et taper :
```bash
cd back
docker compose up
```

lire les instructions sur le docker-compose.md
importer les données de la base :
clique droit sur "Servers/cookaine/Databases/cookaine/schemas/public/tables"
cliquer "query tool"
drap and drop de "cookaine.backup" dans query tool
executer query

ouvrir un autre bash et taper :
```bash
pnpm dev
```

## Lancer le front

ouvrir un autre bash et taper :
```bash
cd front
pnpm dev
```
