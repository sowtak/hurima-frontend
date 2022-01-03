create sequence users_id_seq start 4 increment 1;
create table user_role
(
    user_id int8 not null,
    roles   varchar(255)
);

create table users
(
    id                  int8    not null,
    activation_code     varchar(255),
    is_active           boolean not null,
    email               varchar(255),
    username            varchar(255),
    password            varchar(255),
    password_reset_code varchar(255),
    image_url           varchar(255),
    primary key (id)
);

alter table if exists user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users;
