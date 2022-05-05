drop function f4d6fdb874b328e73b9bcf55ea434f2bc36c6d403;

drop view view_prontuarios;

create view view_prontuarios as
  select
        p.id,
        p.category,
        p.medicos,
        p.pacientes,
        c.label as categorylabel,
        (select json_build_object('id',id,'label',label) from users where p.medicos=id) as jsonmedicos,
        (select json_build_object('id',id,'label',label,'telefone',telefone,'whatsapp',whatsapp,'cidade',cidade,'estado',estado,'nascimento',nascimento,'email',email,'rua',rua,'numero',numero,'complemento',complemento,'bairro',bairro,'cpf',cpf,'identidade',identidade) from users where p.pacientes=id) as jsonpacientes,
        s.uuid,
        json_build_object('id',u.id,'label',u.label) as users,
        p.a,
        p.d,
        p.created_at,
        p.update,
        p.label as label,
/*         json_build_object('id',c.id,'label',c.label) as category, */
        CASE WHEN p.users = s.users THEN true else false END as me,
        (select json_agg(json_build_object('id',id,'label',label)) from view_users where id = ANY(p.share)) as share,
        (select json_agg(json_build_object('id',id,'filename',filename,'key',key)) from files where  p.files=anexos ) as files 

    from sessions s

    join prontuarios p on (p.users=s.users or s.users = ANY(p.share)  ) 
    join users u on (s.users=u.id)
    join category c on (p.category=c.id) 

    where p.d=false and p.a=true

    order by s.id desc,p.update desc;


    /* plv8 */

        create function f4d6fdb874b328e73b9bcf55ea434f2bc36c6d403(euuid uuid) 

        returns setof view_prontuarios as $$

        var query = 'select * from view_prontuarios where uuid=$1'

        var json = plv8.execute(query,[euuid]);

        return json;

        $$ language plv8;