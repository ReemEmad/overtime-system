import * as React from "react";
import {
    useEffect,
    useState,
} from "react";
import {
    Box,
    Typography,
    Snackbar,
    Alert, Button, Chip, Autocomplete, Grid,
} from "@mui/material";
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Avatar from "@mui/material/Avatar";
import {skillExp, userProfile} from "../data/DTO/Profile";
import {useDeleteProfileSkillMutation, useGetProfileQuery, useUpdateProfileMutation} from "../services/profile.service";
import {useGetSkillsQuery} from "../services/skill.service";
import {skillDto} from "../data/DTO/Skill";
import {ErrorResponse, Message} from "../data/DTO/Error";

const style = {
    profileContainer: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    saveEditButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addSkillBtn: {
        marginBottom: "1rem",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '12rem',
        height: '12rem',
        marginBottom: '2rem',
        bgcolor: 'rgba(241,91,43,0.75)',
        fontSize: '350%',
    },
    field: {
        marginBottom: '1rem',
        fontFamily: "Georgia",
    },
    text: {
        fontFamily: "Georgia",
    },
    textField: {
        marginBottom: '1rem',
        width: '20rem',
        fontFamily: "Georgia",
    },
    autocomplete: {
        width: '12rem',
        marginLeft: '1rem',
        color: "black",
        fontWeight: "bold",
        opacity: 1,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editSkillBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        marginBottom: '2rem',
    },
    dividerChip: {
        fontSize: '120%',
        fontFamily: "Georgia",
        padding: '.5rem',
    }
};

export default function Profile() {
    const {data: profileData, isSuccess: isProfileReturnSuccess} = useGetProfileQuery({});
    const [deleteProfileSkill, deleteProfileSkillResponse] = useDeleteProfileSkillMutation();
    const [putProfile, putProfileResponse] = useUpdateProfileMutation();
    const {data: skillResp, isSuccess: isSkillsReturnedSuccess} = useGetSkillsQuery({
        page_number: 0,
        page_size: 0,
    });

    const [error, setError] = useState(new ErrorResponse());
    const [editing, setEditing] = useState(false);
    const [skills, setSkills] = useState<skillDto[]>([]);
    const [experiences, setExperiences] = useState(JSON.parse(localStorage.getItem("constants")!)?.experiences);
    const [newSkills, setNewSkills] = useState<skillExp[]>([]);
    const [profile, setProfile] = useState<userProfile>({
        name: "",
        work_title: "",
        id: "",
        phone: "",
        work_location: "",
        email: "",
        password: "",
        skill_list: [],
        skills: []
    });

    useEffect(() => {
        if (isProfileReturnSuccess) {
            if (profileData.messages.length === 0) {
                setProfile(profileData.body);
                if (isSkillsReturnedSuccess && skillResp.messages.length === 0) {
                    const profileSkillIds = new Set(profileData.body.skill_list.map((skill: skillExp) => skill.id));
                    let skillsToChoose = skillResp.body.filter((skill: skillDto) => !profileSkillIds.has(skill.id));
                    setSkills(skillsToChoose);
                }

            } else {
                setError(new ErrorResponse(true, profileData.messages));
            }
        }
        if (isSkillsReturnedSuccess && skillResp.messages.length != 0) {
            setError(new ErrorResponse(true, skillResp.messages));
        }
    }, [isProfileReturnSuccess, isSkillsReturnedSuccess, profileData, skillResp]);
    useEffect(() => {
        if (!deleteProfileSkillResponse.isLoading && (deleteProfileSkillResponse.isError || deleteProfileSkillResponse.isSuccess) &&
            deleteProfileSkillResponse.data.messages.length != 0) {
            setError(new ErrorResponse(true, deleteProfileSkillResponse.data.messages));
        }
    }, [deleteProfileSkillResponse]);
    useEffect(() => {
        if (!putProfileResponse.isLoading && (putProfileResponse.isError || putProfileResponse.isSuccess) && putProfileResponse.data != undefined &&
            putProfileResponse.data.messages != undefined && putProfileResponse.data.messages.length != 0) {
            console.log(putProfileResponse.data.messages);
            setError(new ErrorResponse(true, putProfileResponse.data.messages));
        }
    }, [putProfileResponse]);

    function removeErrorMsg(msg: Message) {
        setError({...error, messages: error.messages.filter((errMsg) => msg.message != errMsg.message)});
    }

    function handleEditProfile() {
        setEditing(true);
    };

    function handleSaveProfile() {
        setProfile({...profile, skill_list: [...profile.skill_list, ...newSkills]});
        let skillList = [...profile.skill_list, ...newSkills].filter(s => s.skill)
        let profileObj = {...profile, skills: skillList}
        putProfile(profileObj);
        setEditing(false);
        setNewSkills([]);
    };

    function handleSkillDelete(skill: skillExp) {
        deleteProfileSkill({skillId: skill.id});
    }

    function handleNewSkillDelete(index: number, skill: skillExp) {
        let updatedSkills: skillExp[] = [...newSkills.slice(0, index), ...newSkills.slice(index + 1)]
        setNewSkills(updatedSkills);
    }

    function handleSkillAdd() {
        const s: skillExp = {name: skills[0].name, skill: skills[0].id, level_of_experience: experiences[0]}
        setNewSkills([...newSkills, s])
    }

    function onProfileChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    const updateSkill = (index: number, value: string, skill: skillExp) => {
        let updatedSkills: skillExp[] = [...profile.skill_list];
        updatedSkills[index] = {
            ...updatedSkills[index],
            level_of_experience: value,
            skill: skill.id,
        };
        setProfile({...profile, skill_list: updatedSkills});
    }
    const updateNewSkill = (index: number, value: string, skillId: number, skillName: boolean) => {
        let updatedSkills: skillExp[] = [...newSkills];
        if (skillName) {
            updatedSkills[index] = {
                ...updatedSkills[index],
                name: value,
                skill: skillId
            };
        } else {
            updatedSkills[index] = {
                ...updatedSkills[index],
                level_of_experience: value,
            };
        }
        setNewSkills(updatedSkills);
    }
    const getFirstTwoInitialCharacters = (name: string) => {
        const names = name.split(' ');
        const firstName = names[0];
        const lastName = names.length > 1 ? names[1] : '';

        const firstInitial = firstName.charAt(0);
        const secondInitial = lastName.charAt(0);

        return firstInitial + (secondInitial || '');
    }
    const mapSkillExpToDto = (skill: skillExp): skillDto => {
        const {name} = skill;
        return skills.filter(s => s.name === name)[0]
    }

    return (
        <>
            {error.messages.length > 0 && error.messages.map((msg: Message, index: number) => (
                <Snackbar
                    key={index}
                    open={error.exist}
                    autoHideDuration={2000}
                    onClose={() => removeErrorMsg(msg)}>
                    <Alert severity={msg.code === 'ERROR' ? "error" : "success"}> {msg.message}</Alert>
                </Snackbar>
            ))}
            <Box sx={style.profileContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Avatar sx={style.avatar}
                                alt="Profile">{getFirstTwoInitialCharacters(profile.name)}</Avatar>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {editing ? (
                            <>
                                <TextField
                                    sx={style.textField}
                                    label="Name"
                                    name="name"
                                    value={profile.name}
                                    onChange={(e) => onProfileChange(e)}
                                />
                                <TextField
                                    sx={style.textField}
                                    label="Title"
                                    name="work_title"
                                    value={profile.work_title}
                                    onChange={(e) => onProfileChange(e)}
                                />
                                <TextField
                                    sx={style.textField}
                                    label="Phone"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={(e) => onProfileChange(e)}
                                />
                            </>
                        ) : (
                            <>
                                <Typography variant="h4" sx={style.field}>
                                    {profile.name}
                                </Typography>
                                <Typography variant="body1" color="black" sx={style.text}>
                                    Title
                                </Typography>
                                <Typography variant="body2" color="grey" sx={style.field}>
                                    {profile.work_title}
                                </Typography>
                                <Typography variant="body1" color="black" sx={style.text}>
                                    Phone
                                </Typography>
                                <Typography variant="body2" color="grey" sx={style.field}>
                                    {profile.phone}
                                </Typography>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {editing ? (
                            <>
                                <TextField
                                    sx={style.textField}
                                    label="Email"
                                    name="email"
                                    value={profile.email}
                                    onChange={(e) => onProfileChange(e)}
                                />
                                <TextField
                                    sx={style.textField}
                                    label="Office Location"
                                    name="work_location"
                                    value={profile.work_location}
                                    onChange={(e) => onProfileChange(e)}
                                />
                                <TextField
                                    sx={style.textField}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={profile.password}
                                    onChange={(e) => onProfileChange(e)}
                                />
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" color="black" sx={style.text}>
                                    Email
                                </Typography>
                                <Typography variant="body2" color="grey" sx={style.field}>
                                    {profile.email}
                                </Typography>
                                <Typography variant="body1" color="black" sx={style.text}>
                                    Office Location
                                </Typography>
                                <Typography variant="body2" color="grey" sx={style.field}>
                                    {profile.work_location}
                                </Typography>
                                <Typography variant="body1" color="black" sx={style.text}>
                                    Password
                                </Typography>
                                <Typography variant="body2" color="grey" sx={style.field}>
                                    ******
                                </Typography>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {editing ? (
                                <Button variant="contained" color="primary" onClick={handleSaveProfile}
                                        sx={style.saveEditButton}>
                                    Save Profile
                                </Button>
                            ) :
                            (<Button variant="contained" color="primary" sx={style.saveEditButton}
                                     onClick={handleEditProfile}>
                                    Edit Profile
                                </Button>
                            )}
                    </Grid>
                </Grid>
                <Divider><Typography sx={style.dividerChip}> Skills</Typography></Divider>
                <>{editing ? (<>

                        {profile.skill_list.map((skill: skillExp, index: number) => (
                            <Box sx={style.editSkillBox} key={index}>
                                <TextField sx={style.autocomplete}
                                           disabled
                                           id="outlined-disabled"
                                           label="Skill"
                                           defaultValue={skill.name}
                                />
                                <Autocomplete sx={style.autocomplete}
                                              onChange={(event, newValue: string | null) => {
                                                  if (newValue != null) {
                                                      updateSkill(index, newValue, skill);
                                                  }
                                              }}
                                              value={skill.level_of_experience}
                                              id="combo-box-demo"
                                              options={experiences}
                                              renderInput={(params) => (
                                                  <TextField{...params} label="Experience" placeholder="Experience"/>)}
                                />
                                <Button sx={{marginLeft: "1rem"}}
                                        color="info"
                                        startIcon={<DeleteIcon/>} onClick={() => handleSkillDelete(skill)}>
                                </Button>
                            </Box>))}

                        <Typography sx={style.container}><Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon/>}
                            color="info"
                            onClick={() => handleSkillAdd()}>
                            Add New Skill
                        </Button>
                        </Typography>
                        {newSkills.map((skill: skillExp, index: number) => (
                            <Box sx={style.editSkillBox} key={index}>
                                <Autocomplete sx={style.autocomplete}
                                              onChange={(event, newValue: skillDto | null) => {
                                                  if (newValue != null) {
                                                      updateNewSkill(index, newValue.name, newValue.id, true)
                                                  }
                                              }}
                                              value={mapSkillExpToDto(skill)}
                                              id="combo-box-demo"
                                              options={skills}
                                              getOptionLabel={(skill: skillDto) => skill.name}
                                              renderInput={(params) => (
                                                  <TextField{...params} label="Skill" placeholder="Skill"/>)}
                                />
                                <Autocomplete sx={style.autocomplete}
                                              onChange={(event, newValue: string | null) => {
                                                  if (newValue != null) {
                                                      updateNewSkill(index, newValue, 0, false)
                                                  }
                                              }}
                                              value={skill.level_of_experience}
                                              id="combo-box-demo"
                                              options={experiences}
                                              renderInput={(params) => (
                                                  <TextField{...params} label="Experience" placeholder="Experience"/>)}
                                />
                                <Button sx={{marginLeft: "1rem"}}
                                        color="info"
                                        startIcon={<DeleteIcon/>} onClick={() => handleNewSkillDelete(index, skill)}>
                                </Button>
                            </Box>))}
                    </>) :
                    (<>
                        {profile.skill_list.map((skill: skillExp, index: number) => (
                            <Box sx={style.editSkillBox} key={index}>
                                <TextField sx={style.autocomplete}
                                           disabled
                                           id="outlined-disabled"
                                           label="Skill"
                                           defaultValue={skill.name}
                                />
                                <TextField sx={style.autocomplete}
                                           disabled
                                           id="outlined-disabled"
                                           label="Experience"
                                           defaultValue={skill.level_of_experience}
                                />
                            </Box>))}
                    </>)}
                </>

            </Box>
        </>
    );
}

