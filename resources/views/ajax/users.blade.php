<table>
    <thead>
    <tr>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th>Дата рождения</th>
        <th>Школа</th>
    </tr>
    </thead>

    <tbody>
    @forelse ($users as $user)
        <tr>
            <td>{{ $user->surname }}</td>
            <td>{{ $user->name }}</td>
            <td>{{ $user->patronymic }}</td>
            <td>{{ $user->date_of_birth }}</td>
            <td>{{ $user->school }}</td>
        </tr>
    @empty
        <p>No users</p>
    @endforelse
    </tbody>
</table>


