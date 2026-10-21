# Administration des taux

L'URL privée est `https://www.orizia-courtage.fr/administration`. Elle est exclue de l'indexation et nécessite un compte Supabase autorisé.

## 1. Créer la table

Dans Supabase, ouvrez **SQL Editor** puis exécutez :

```sql
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
```

Ne créez aucune policy : le site lit et écrit cette table exclusivement par son serveur, grâce à la clé secrète. Les visiteurs n'ont donc aucun accès direct à la table.

## 2. Créer le compte qui pourra modifier les taux

Dans **Authentication → Users → Add user**, créez le compte avec l'adresse e-mail qui sera indiquée dans `ORIZIA_ADMIN_EMAIL`.

## 3. Ajouter les variables dans Vercel

Dans **Settings → Environment Variables**, ajoutez ces quatre variables pour **Production** et **Preview** :

```text
NEXT_PUBLIC_SUPABASE_URL=https://<votre-projet>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Publishable key Supabase>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret Supabase>
ORIZIA_ADMIN_EMAIL=<adresse e-mail de Cindy>
```

La clé `SUPABASE_SERVICE_ROLE_KEY` est secrète : ne la transmettez jamais dans une conversation, ne la mettez pas dans le navigateur et ne la préfixez pas par `NEXT_PUBLIC_`.

Après l'ajout des variables, lancez un redéploiement Vercel. Les changements de taux suivants ne demanderont plus de redéploiement.

## Réglages inclus

- Tous les seuils d'endettement, dont le seuil critique.
- Taux immobilier min., max., par défaut et par zone/durée.
- SCPI, crowdfunding, Livret A et droit de partage de soulte.
- Assurance emprunteur par tranche d'âge.
- Assurance-vie : frais, fiscalité, abattements et rendements par répartition.
- PER : tranches marginales d'imposition et plafonds.

Les anciennes variables Vercel restent des valeurs de secours. Elles peuvent être conservées ; dès le premier enregistrement dans l'administration, Supabase devient prioritaire.
