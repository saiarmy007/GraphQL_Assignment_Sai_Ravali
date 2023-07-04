
import { List } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
import CarCard from '../listItems/CarCard'

const getStyles = () => ({
    card: {
        width: '455px',
        backgroundColor: '#f1d1d1',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
    }
})

const Car = props => {
    const { id , people } = props;
    const styles = getStyles();

    const { loading, error, data } = useQuery(GET_CARS, {
        variables: { personId: id }
    });

    if (loading) return 'Loading...';
    if (error) return `Error from Cars component! ${error.message}`; 

    console.log("Person cars data: ", data.personCars);

    return (
        <>
            <List grid={{gutter: 20, column: 1}} style={styles.list}>
            {data.personCars.map(({id, make, model, personId, price, year}) => (
                <List.Item key={id}>
                    <CarCard id={id} make={make} model={model} year={year} price={price} personId={personId} people={people} />
                </List.Item>
            ))}
            </List> 
        </>
    )
}

export default Car;