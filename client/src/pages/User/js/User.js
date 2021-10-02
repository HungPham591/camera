import { useForm } from 'react-hook-form';

export default function ListCamera(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    const titles = [{ value: '_id', title: 'id' }, { title: 'gmail', value: 'user_gmail' }, { title: 'password', value: 'user_pass' }, { title: 'google id', value: 'google_id' }, { title: 'google token', value: 'google_token' }, { title: 'access token', value: 'access_token' }, { title: 'created at', value: 'createdAt' }];
    const form = () => {
        return (
            <form className='custom-card form-info' onSubmit={handleSubmit(onSubmit)}>
                {
                    titles.map((value, index) => {
                        return (
                            <div key={index}>
                                <p className='label'>{value.title}</p>
                                <input type='text' {...register(value.value, { required: true })} defaultValue={props?.data[value.value] || ''} />
                                {errors[value.value] && <p>Last name is required.</p>}
                            </div>
                        )
                    })
                }
                <input type="submit" />
            </form>
        )
    }

    return (
        <div>
            <p className='title'>Info của bạn</p>
            {form()}
        </div>
    )
}
