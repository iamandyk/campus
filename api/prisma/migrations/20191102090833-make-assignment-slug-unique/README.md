# Migration `20191102090833-make-assignment-slug-unique`

This migration has been generated by Andy Kay at 11/2/2019, 9:08:33 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `Assignment.slug` ON `campus`.`Assignment`(`slug`)
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191031094949-add-assignment-slug..20191102090833-make-assignment-slug-unique
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("MYSQL_URL")
 }
 generator photonjs {
   provider = "photonjs"
@@ -73,9 +73,9 @@
 }
 model Assignment {
   id        String   @id @default(cuid())
-  slug      String
+  slug      String   @unique
   course    Course
   name      String
   points    Int
   grades    Grade[]
```

## Photon Usage

You can use a specific Photon built for this migration (20191102090833-make-assignment-slug-unique)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191102090833-make-assignment-slug-unique'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
