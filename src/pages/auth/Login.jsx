import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "/"; 
  };

  return (
    // Bagian Background: Menggunakan Biru Cerah ke Ungu/Pink Tajam
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#2B7FFF] via-[#9D4EDD] to-[#FF4D97] p-4">
      <div className="w-full max-w-[450px]">
        
        {/* Card Utama: Putih Bersih dengan Rounded Halus */}
        <div className="bg-white rounded-[35px] shadow-2xl p-12 relative overflow-hidden">
          
          {/* Icon Lock Atas */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#2B7FFF]">
              <Lock size={28} />
            </div>
          </div>

          {/* Judul & Sub-judul */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">welcome Back!</h2>
            <p className="text-gray-400 mt-2 font-medium">Silahkan login untuk mengelola dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Username..." 
                  className="w-full pl-12 pr-4 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password...</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-[#F0F5FA] border-none rounded-2xl outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-[#2B7FFF] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#2B7FFF] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 text-sm font-medium">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2B7FFF] focus:ring-[#2B7FFF]" />
                Ingat saya
              </label>
              <a href="#" className="text-[#2B7FFF] text-sm font-semibold hover:underline">Lupa password?</a>
            </div>

            {/* Tombol Sign In Biru Gacor */}
            <button 
              type="submit" 
              className="w-full bg-[#2A52E2] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
            >
              Sign in
            </button>
          </form>

          {/* Link Daftar */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Belum punya akun? <a href="#" className="text-blue-600 font-bold hover:underline">Daftar sekarang</a>
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="text-center text-white/80 text-[10px] mt-10 tracking-widest uppercase">
          © 2026 BPF PROJECT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
};

export default Login;
//import { useState } from "react"
//import { useNavigate } from "react-router-dom"
//import axios from "axios"
//import { BsFillExclamationDiamondFill } from "react-icons/bs"
//import { ImSpinner2 } from "react-icons/im"
//export default function Login() {
    /* navigate, state & handleChange*/
  //  const navigate = useNavigate()
    //const [loading, setLoading] = useState(false)
   // const [error, setError] = useState("")
   // const [dataForm, setDataForm] = useState({
     //   email: "",
       // password: "",
    //})

    //const handleChange = (evt) => {
      //  const { name, value } = evt.target
        //setDataForm({
          //  ...dataForm,
            //[name]: value,
       // })
    //}


    /* process form */
    //const handleSubmit = async (e) => {
      //  e.preventDefault()

      //  setLoading(true)
       // setError(false)

        //axios
            //.post("https://dummyjson.com/user/login", {
          //      username: dataForm.email,
          //      password: dataForm.password,
         //   })
        //    .then((response) => {
                // Jika status bukan 200, tampilkan pesan error
           //     if (response.status !== 200) {
         //           setError(response.data.message);
          //          return;
          //      }

                // Redirect ke dashboard jika login sukses
          //      navigate("/");
         //   })
         //   .catch((err) => {
         //       if (err.response) {
         //           setError(err.response.data.message || "An error occurred");
         //       } else {
         //           setError(err.message || "An unknown error occurred");
      //          }
      //      })
      //      .finally(() => {
      //          setLoading(false);
      //      });

 //   }
 //   const errorInfo = error ? (
     //   <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
     //       <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      //      {error}
      //  </div>
   // ) : null

  //  const loadingInfo = loading ? (
     //   <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
     //       <ImSpinner2 className="me-2 animate-spin" />
     //       Mohon Tunggu...
     //   </div>
   // ) : null
   // return (
      //  <div>
          //  <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
         //       Welcome Back 👋
          //  </h2>
          //  {errorInfo}

          //  {loadingInfo}
          //</div>  <form onSubmit={handleSubmit}>
              //  <div className="mb-5">
              //      <label className="block text-sm font-medium text-gray-700 mb-1">
               //         Email Address
                //    </label>
                //    <input
                 //       type="text"
                 //       id="email"
                //        name="email"
                 //       className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                  //          placeholder-gray-400"
                   //     placeholder="you@example.com"
                   //     onChange={handleChange}

               //     />
              //  </div>
              //  <div className="mb-6">
              //      <label className="block text-sm font-medium text-gray-700 mb-1">
              //          Password
                //    </label>
               //     <input
                 //       type="password"
                //        id="password"
                  //      name="password"
                   //     className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                  //          placeholder-gray-400"
                     //   placeholder="********"
                     //   onChange={handleChange}

                   
             //   </div>//
              //  <button//
                //    type="submit"
                 //   className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                //        rounded-lg transition duration-300"
              //</form>  >
                 //   Login//
            //    </button>//
         //  </form>//
     // </div>//
 //   )
//}
