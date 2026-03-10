import React, { useRef, useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const change = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
        
    }

    useEffect(() => {
        getPasswords()
        

    }, [])

    const copytext = (text) =>{
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (change.current.src.includes("icons/hide.png")) {
            alert("hide the password");
            change.current.src = "icons/show.png";
            passwordRef.current.type = "password"
        }
        else {
            alert("show the password");
            change.current.src = "icons/hide.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
            
            // if any such id exists in db then delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id: form.id}) })

            setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify({...form, id: uuidv4() }) })

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            // console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password Saved Succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else{
            toast('Error: Password Not Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id !== id))
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id}) })

            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
            toast('Password Deleted Succesfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id", id)
        setForm({...passwordArray.filter(i=>i.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id !== id))
        toast('Password Edited Succesfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="absolute z-[-2] h-screen w-screen top-15 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

            <div className="p-2 md:p-0 md:mycontainer ">
                <div className='logo font-bold text-black text-center text-2xl'>
                    <span className='text-purple-500'>&lt;</span>
                    <span>Pass</span><span className='text-purple-500'>LOG/&gt;</span>
                </div>
                <div className='text-purple-800 text-center text-2lg'>
                    Your own Password Manager
                </div>
                <div>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        savePassword();
                        }}
                        className="text-black flex flex-col p-4 gap-5">
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='bg-white py-2 px-4 border border-pink-300 rounded-2xl' type="text" name='site' id='site' />
                        <div className="flex flex-col md:flex-row gap-5">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white border border-pink-300 py-1 px-2 rounded-2xl' type="text" name='username' id='username' />
                            <div className="relative">

                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white border border-pink-300 py-1 px-2 rounded-2xl w-full' type="password" name="password" id='password' />
                                <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ' onClick={showPassword}>
                                    <img ref={change} className='p-1' src="icons/show.png" alt="show" />
                                </span>
                            </div>
                        </div>

                        <button type='submit' className='flex justify-center items-center bg-pink-300 hover:bg-pink-200 rounded-full px-15 py-2 md:w-fit'>
                            <lord-icon
                                src="https://cdn.lordicon.com/vjgknpfx.json"
                                trigger="hover"
                                stroke="bold"
                                state="hover-swirl"
                                colors="primary:#8930e8,secondary:#320a5c">
                            </lord-icon>Save
                        </button>
                    </form>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length != 0 &&
                    <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-purple-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-300'>
                            {passwordArray.map((item, index)=>{
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center w-50'><div className='flex items-center justify-around' onClick={()=>{copytext(item.site)}}><a href={item.site} target='_blank'>{item.site}</a><span className='flex gap-3'><img src="icons/copy.svg" alt="copy" /></span></div></td>
                                    <td className='py-2 border border-white text-center w-25'><div className='flex items-center justify-around' onClick={()=>{copytext(item.username)}}>{item.username} <span className='flex gap-3'><img src="icons/copy.svg" alt="copy" /></span></div></td>
                                    <td className='py-2 border border-white text-center w-25'><div className='flex items-center justify-around' onClick={()=>{copytext(item.password)}}>{"*".repeat(item.password.length)} <span className='flex gap-3'><img src="icons/copy.svg" alt="copy" /></span></div></td>
                                    <td className='py-2 border border-white text-center w-15'><span className='flex gap-3 items-center justify-center'><img className='cursor-pointer' onClick={()=>{deletePassword(item.id)}} src="icons/delete.svg" alt="delete" /><img className='cursor-pointer' onClick={()=>{editPassword(item.id)}} src="icons/edit.svg" alt="edit" /></span></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
