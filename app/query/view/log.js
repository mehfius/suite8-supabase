drop view view_log;

create view view_log as

select
u.created_at,
u.a,
u.id,
u.label,
u.cpf,
u.email,
u.password,
u.telefone,
(select (json_agg(jsonb_build_object('created_at',created_at,'ip',ip) order by id desc)) from sessions where users=u.id) as sessions,
(select count(*) from prontuarios where users=u.id and a is true and d is false) as cards,
(select count(*) from prontuarios where u.id=ANY(share) and a is true and d is false) as cardsrecebidos,
(select label from areas where id=u.areas ) as areas

 from users u