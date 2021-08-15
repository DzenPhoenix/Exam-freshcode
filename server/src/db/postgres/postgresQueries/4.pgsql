/*Для роли сreative необходимо выплатить 3-м юзерам
с самым высоким рейтингом по 10$ на их счета.*/

UPDATE "Users"
SET balance = balance + 10
WHERE "Users".id IN (
    SELECT id
    FROM "Users"
    WHERE role = 'creator'
    ORDER BY rating ASC
    LIMIT 3
);