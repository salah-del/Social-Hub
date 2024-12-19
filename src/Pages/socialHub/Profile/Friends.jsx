import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Friends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Ahmed", avatar: "https://via.placeholder.com/50", desc: "Frontend Developer" },
        { id: 2, name: "Sara", avatar: "https://via.placeholder.com/50", desc: "UI/UX Designer" },
      ]);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {!isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-4"
              style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
            >
              <Skeleton circle width={50} height={50} />
              <div>
                <Skeleton width={150} height={20} style={{ marginBottom: "8px" }} />
                <Skeleton width={250} height={15} />
              </div>
            </div>
          ))
        : users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 mb-4"
              style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <div>
                <h2 style={{ margin: 0 }}>{user.name}</h2>
                <p style={{ margin: 0 }}>{user.desc}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Friends;
