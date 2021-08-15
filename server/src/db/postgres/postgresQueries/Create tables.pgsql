CREATE TABLE "Catalogs" (
    id serial NOT NULL PRIMARY KEY,
    "catalogName" varchar(50) DEFAULT 'New Catalog',
    "ownerId" integer NOT NULL REFERENCES "Users"(id)
);

CREATE TABLE "Conversations"(
    id serial NOT NULL PRIMARY KEY,
    "catalogId" integer REFERENCES "Catalogs"(id)
);

CREATE TABLE "Messages"(
    id serial NOT NULL PRIMARY KEY,
    "senderId" integer NOT NULL REFERENCES "Users"(id),
    body TEXT,
    "conversationId" integer NOT NULL REFERENCES "Conversations"(id),
    "createdAt" timestamp DEFAULT now()
);


CREATE TABLE "UserConversationRelation"(
    "userId" integer NOT NULL REFERENCES "Users"(id),
    "conversationId" integer NOT NULL REFERENCES "Conversations"(id),
    PRIMARY KEY("userId","conversationId")
);

CREATE TABLE "FavoriteAndBlackLists"(
    "ownerId" integer NOT NULL REFERENCES "Users"(id),
    "conversationId" integer NOT NULL REFERENCES "Conversations"(id),
    "targetId" integer NOT NULL REFERENCES "Users"(id),
    "inBlackList" boolean DEFAULT FALSE,
    "inFavoriteList" boolean DEFAULT FALSE,
    PRIMARY KEY("ownerId","conversationId")
);


/*DROP TABLE "FavoriteAndBlackLists";
DROP TABLE "UserConversationRelation";
DROP TABLE "Messages";
DROP TABLE "Conversations"
DROP TABLE "Catalogs";*/