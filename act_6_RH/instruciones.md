### ACTIVIDAD 6 API

PÁGINAS A CREAR:
    - /home (home): donde ser cargará el listado de usuarios completo.
    - /newuser (newuser): donde ser cargará un formulario que dará de alta un usuario siguiendo el patron del api de creater user.
    - /updateuser/1 (updateuser): se cargará reutilizando el formulario de registro los datos del usuario a actualizar para que se pueda actualizar los datos y mandárselos al api.
    - user/1 (viewUser): donde ser cargará la vista de usuario con todos sus datos. Nótese que el numero de la ruta corresponde al id del usuario.

Servicios:
    - Servicio de usuarios (users).

Interfaces:
    - Interfaz para la información inicial (initialInfo)
    - Interfaz para los usuarios (user)

Componentes:
    - home (pages)
    - form (components)
    - viewUser (pages)
    - userCard (components)
    - header (components)
    - footer (components)
