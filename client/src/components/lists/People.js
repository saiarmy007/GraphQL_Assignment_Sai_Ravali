
import { List } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'
import AddCar from '../forms/AddCar'
import Person from '../listItems/Person'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
    }
})

const People = () => {
    const styles = getStyles();

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    if (data.people.length < 1) {
        return <></>
    }
    else {
        return (
            <>
            <AddCar people={data.people}/>
            <List grid={{gutter: 20, column: 1}} style={styles.list}>
                {data.people.map(({id, firstName, lastName}) => (
                    <List.Item key={id}>
                        <Person id={id} firstName={firstName} lastName={lastName} people={data.people} />
                    </List.Item>
                ))}
            </List>
            </>
        )
    }
}

export default People