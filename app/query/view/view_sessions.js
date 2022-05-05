drop view view_sessions;

create view view_sessions as

select
s.id,
s.uuid,
s.users,
u.areas,
u.label,
s.created_at,
(select json_build_object('id',id,'label',label,'telefone',telefone,'whatsapp',whatsapp,'cidade',cidade,'estado',estado,'nascimento',nascimento,'email',email) from users where s.users=id) as jsonusers

from sessions s
join users u on (s.users=u.id)
order by s.id desc
