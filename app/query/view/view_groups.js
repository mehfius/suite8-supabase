drop view view_login;
drop view view_groups;

create view view_groups as

select
    g.id,
    g.label,
    a.id as areas,
    (select jsonb_agg(jsonb_build_object('id',modules.id,'label',modules.label,'url',modules.url,'premium',modules.premium,'beta',modules.beta,'attributes',modules.attributes)) from modules where modules.a = true and modules.groups=g.id and id = ANY(a.modules)) as modules

    from groups g

    join modules m on (m.groups=g.id)
    join areas a on (m.id = ANY(a.modules))

    group by g.id,a.id
    order by g.id 