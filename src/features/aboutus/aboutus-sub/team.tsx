interface Member {
  name: string;
  role: string;
  imageUrl: string;
  socialProfile: string[];
}

function TeamMembers() {
  const members: Member[] = [
    {
      name: "Chris Hemsworth",
      role: "Developer",
      imageUrl: "",
      socialProfile: [],
    },
    {
      name: "Chris Hemsworth",
      role: "Developer",
      imageUrl: "",
      socialProfile: [],
    },
    {
      name: "Chris Hemsworth",
      role: "Developer",
      imageUrl:
        "https://images.pexels.com/photos/17136147/pexels-photo-17136147/free-photo-of-indian-traditional-beard-man.jpeg?auto=compress&cs=tinysrgb&w=600",
      socialProfile: [],
    },
  ];
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full space-x-10">
      {members.map((member) => {
        return (
          <div className=" flex flex-col justify-center items-center">
            <img
              src={member.imageUrl}
              alt="team"
              height={140}
              width={140}
              className=" rounded-full h-30 w-30"
            />
            <p className="text-xl font-bold text-gray-800">{member.name}</p>
            <p className="text-sm font-light text-gray-600">{member.role}</p>
            <div>
              {member.socialProfile.map((link) => {
                return <a href={link}>I</a>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamMembers;
