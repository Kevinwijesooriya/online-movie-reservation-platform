import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState';


export default function MoviesTicket() {
    const state = useContext(GlobalState);
    const [userDetails] = state.userAPI.user;
    console.log(userDetails._id);
    return (
        <div>MoviesTicket
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}
