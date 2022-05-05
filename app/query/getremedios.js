select 
r.id,
r.label,
ur.posologia


from sessions s 

join users u on (s.users=u.id) 
join usersremedios ur on (ur.users=u.id)
join remedios r on (ur.remedios=r.id)

where s.uuid='5c09b362-2f97-42a3-8499-b6abf4b3d6dc';
