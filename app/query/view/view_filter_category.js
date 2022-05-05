

drop view view_filters_category;

create view view_filters_category as
select
  s.uuid,
  c.id,
  c.label as label,
  count(*) as count,
  (select json_agg(json_build_object('id',id,'filename',filename,'key',key)) from files where c.files::text=anexos ) as files 

from prontuarios p

join category c on (c.id=p.category)
join sessions s on (s.users=p.users or s.users = any(p.share))

where p.category is not null /* and s.uuid='74c80da1-7505-4eca-b3bc-3b1ae5a431d1'
 */
group by c.id,s.uuid

order by label asc;

drop view view_filters_pacientes;

create view view_filters_pacientes as  



select

  s.uuid,
  c.id,
  c.label as label, 
  count(*) as count, 
  (select json_agg(json_build_object('id',id,'filename',filename,'key',key)) from files where c.files::text=anexos ) as files 

from prontuarios  p

join users        c on (c.id=p.pacientes)

join sessions     s on (s.users=p.users or s.users = any(p.share))

where p.pacientes is not null /* and s.uuid='74c80da1-7505-4eca-b3bc-3b1ae5a431d1'
 */
group by c.id,s.uuid

order by lower(unaccent(c.label)) asc;


