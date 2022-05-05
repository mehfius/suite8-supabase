drop view prontuariospacientes;

create view prontuariospacientes as
    select
        *
    from prontuarios where d=false and a=true
