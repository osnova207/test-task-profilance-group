import React, {useState} from "react";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";

const NewsPage = ({ list, onDelete, onApprove, onChangeSearch, onOpenAddNewsModal, isLogged, isAdmin }) => {

    const [inputValue, setInputValue] = useState("");

    const inputChange = (e) => {
        setInputValue(e.target.value);
        onChangeSearch(e.target.value)
    };

    const checkAdmin = () => isLogged && isAdmin;

    const renderTableHeader = () => (
        <thead>
            <tr>
                <th>
                    Название
                </th>
                <th>
                    Описание
                </th>
                <th>
                    Дата
                </th>

                {isLogged &&
                    <th>
                        Статус
                    </th>}

                {checkAdmin() &&
                    <th>
                        Управление
                    </th>}
            </tr>
        </thead>
    );

    const renderTableBody = () => (
        <tbody>
            {list.map(item => (
                <tr key={item.id}>
                    <td>
                        {item.title}
                    </td>
                    <td>
                        {item.description}
                    </td>
                    <td>
                        {item.date}
                    </td>
                    {isLogged &&
                        <td>
                            {item.isApproved ? "Одобрено" : "В ожидании"}
                        </td>}
                    {checkAdmin() &&
                        <td>
                            <Button variant="outline-danger mr-2" onClick={() => onDelete(item.id)}>
                                Удалить
                            </Button>
                            {!item.isApproved &&
                            <Button variant="outline-primary" onClick={() => onApprove(item.id)}>
                                Одобрить
                            </Button>}
                        </td>}
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className="NewsPage">
            <div className="m-3 d-flex flex-nowrap">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <i className="material-icons">search</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Поиск..."
                        value={inputValue}
                        onChange={inputChange}
                    />
                </InputGroup>
                {isLogged && !isAdmin &&
                <Button
                    variant="outline-primary"
                    className="flex-shrink-0 ml-2"
                    onClick={onOpenAddNewsModal}
                >
                    Добавить новость
                </Button>}
            </div>
            {list.length === 0 &&
                <h4>
                    Увы, новостей нет...
                </h4>}
            {list.length !== 0 &&
                <Table>
                    {renderTableHeader()}
                    {renderTableBody()}
                </Table>}
        </div>
    )
};

export default NewsPage;