import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import Car from '../lists/Car'
import { Link } from 'react-router-dom'

const getStyles = () => ({
    card: {
        width: '500px',
        backgroundColor: '#dadee3',
        fontSize: 20,
        fontWeight: '700',
    }
})

const Person = props => {
    const { id, firstName, lastName, people } = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => setEditMode(!editMode);

    return (
        <>
            {editMode ?
                <UpdatePerson 
                id={id}
                firstName={firstName}
                lastName={lastName}
                onButtonClick={handleButtonClick} />
                :
                <Card style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}>
                    {firstName} {lastName}
                    <Car id={id} people={people} />
                    <li><Link to={`/people/${id}`}>LEARN MORE</Link></li>
                </Card>
            }
        </>
    )
}

export default Person;