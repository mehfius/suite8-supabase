drop view form_usersremedios;

create view form_usersremedios as 
  select
        ur.id,
        s.users,
        s.uuid,


          json_build_object('fields',
          (select json_agg(
            json_build_object(
              'id',id,
              'url',url,
              'label',label,
              'type',type,
              'grid',grid,
              'gridmobile',gridmobile,
              'attributes',attributes,
              'required',required,
               'value',
                (CASE 

                 /*  WHEN url = 'remedios'       THEN usersremedios.remedios::text */
                  WHEN url = 'remedios'   THEN (select jsonb_build_object('id',id,'label',label) from remedios where id=ur.remedios)::text
                  WHEN url = 'posologia'  THEN ur.posologia::text

                END) 
             
            )  order by o ) as t1 from fields where a is true and d is false and id = ANY(array(select fields2 from modules where url='usersremedios')  )
          ) 
          ) as form


    from sessions s

    left join usersremedios          ur on (ur.users = s.users) 
    join users          u on (s.users   = u.id)


    order by s.id desc