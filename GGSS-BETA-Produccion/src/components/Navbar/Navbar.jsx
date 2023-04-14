import React from 'react'
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css"
const Navbar = ({handleTabChange, tabIndex}) => {

		

  return (
	    <nav className="row gy-3 navbar navbar-expand-lg navbar-light bg-light p-0 m-0 ">
		<div className=" contendeorNavbar"  >
			<button className="navbar-toggler" type="button" 
			data-bs-toggle="collapse" 
			data-bs-target="#navbarNav" 
			aria-controls="navbarNav" 
			aria-expanded="false" 
			aria-label="Toggle navigation">
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav navbarNavSub"  >
				<li >
                    <Link className={ tabIndex === 0 ? "nav-link actived" : "nav-link"} value="1" onClick={(e)=>handleTabChange(0)} >
						Personales
                    </Link>
                </li>
				<li className="nav-item">
					<Link className={ tabIndex === 1? "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(1)} >
						Familia
					</Link>
				</li>
				<li className="nav-item">
					<Link className={ tabIndex === 2?  "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(2)}>Liquidación</Link>
				</li>
				{/* <li className="nav-item">
					<Link className={ "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(3)}>Adic. Liquidación</Link>
				</li> */}
				<li className="nav-item">
					<Link className={ tabIndex === 4? "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(4)}>Trabajos Anteriores</Link>
				</li>
				<li className="nav-item">
					<Link className={ tabIndex === 5? "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(5)}>Documentación</Link>
				</li>
				<li className="nav-item">
					<Link className={ tabIndex === 6? "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(6)}>Licencias</Link>
				</li>
				<li className="nav-item">
					<Link className={ tabIndex === 7? "nav-link actived" : "nav-link"} to="" value="2" onClick={(e)=>handleTabChange(7)}>Extras</Link>
				</li>
			</ul>
		</div>
	</div>
</nav>
	);
};
export default Navbar;