import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { REMOVE_CAR, GET_CARS } from "../../queries"
import filter from 'lodash.filter'

const RemoveCar = ({id, personId}) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar }}) {
            const { personCars } = cache.readQuery({ query: GET_CARS, variables: { personId }})
            cache.writeQuery({
                query: GET_CARS,
                variables: { personId },
                data: {
                    personCars: filter(personCars, o => {
                        return o.id !== removeCar.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to remove this car?")

        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
    }

    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{color: 'blue'}} />
}

export default RemoveCar