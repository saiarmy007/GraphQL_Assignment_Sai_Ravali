import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { REMOVE_PERSON, GET_PEOPLE, REMOVE_PERSON_CARS } from "../../queries"
import filter from 'lodash.filter'

const RemovePerson = ({id}) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson}}) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: filter(people, o => {
                        return o.id !== removePerson.id
                    })
                }
            })
        }
    })

    const [removePersonCars] = useMutation(REMOVE_PERSON_CARS)

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to remove this person?")

        if (result) {
            removePerson({
                variables: {
                    id
                }
            })
            const personId = id
            removePersonCars({
                variables: {
                    personId
                }
            })
        }
    }

    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{color: 'blue'}} />
}

export default RemovePerson