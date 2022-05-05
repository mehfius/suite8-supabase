drop view view_online;

create view view_online as

select 

s.uuid,

u.id,
u.label,
u.email,


    (
      (DATE_PART('day', NOW()::timestamp - l.created_at::timestamp) * 24 + 
      DATE_PART('hour', NOW()::timestamp - l.created_at::timestamp)) * 60 +
      DATE_PART('minute', NOW()::timestamp - l.created_at::timestamp)

    ) as minutes

from users u

join sessions s on (s.users = u.id)

join log l on (l.sessions = s.uuid)

where 

    (
      (DATE_PART('day', NOW()::timestamp - l.created_at::timestamp) * 24 + 
      DATE_PART('hour', NOW()::timestamp - l.created_at::timestamp)) * 60 +
      DATE_PART('minute', NOW()::timestamp - l.created_at::timestamp)

    ) <= 30

    and

    l.id = (select id from log where sessions=l.sessions order by id desc limit 1)
               
order by l.id desc