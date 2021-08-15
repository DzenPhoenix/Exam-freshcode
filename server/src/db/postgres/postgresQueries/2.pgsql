/*Вывести количество юзеров по ролям {admin: 40, customer: 22, …}*/

SELECT "Users".role as "users role", COUNT(*) as "Count of users" 
FROM "Users" GROUP BY "Users".role;
