const { createContext, useState } = require("react");

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [user, setUser] = useState(
        {
            id: 1,
            name: '희성',
            level: 1,
            hp: 50,
            mp: 20,
            exp : 0 ,
            status: {
                str: 5,
                dex: 5,
                int: 5
            },
            atk: 10,
            def: 5
        }

    )
    const [monster, setMonster] = useState([
        {
            id: 1,
            name: '슬라임',
            level: 1,
            hp: 20,
            mp: 0,
            atk: 5,
            def: 2,
            exp: 10
        },
        {
            id: 2,
            name: '고블린',
            level: 2,
            hp: 40,
            mp: 0,
            atk: 10,
            def: 4,
            exp: 20
        }
    ])
    const value = {
        state: { user, monster },
        action: { setUser, setMonster }
    };
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
const { Consumer: DataConsumer } = DataContext;
export { DataProvider, DataConsumer };
export default DataContext;